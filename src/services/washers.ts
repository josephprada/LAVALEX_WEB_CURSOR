import { supabase } from '../lib/supabase'
import type { Washer, WasherFormData } from '../types/washer'

const BUCKET_NAME = 'washer-images'

export const getWashers = async (): Promise<{ data: Washer[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from('washers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return { data: null, error: error as Error }
    }

    return { data: data as Washer[], error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

export const createWasher = async (formData: WasherFormData): Promise<{ data: Washer | null; error: Error | null }> => {
  try {
    // Primero crear la lavadora sin imágenes
    const { data: washerData, error: washerError } = await supabase
      .from('washers')
      .insert({
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        price: formData.price.trim(),
        status: formData.status,
        image_urls: [],
      })
      .select()
      .single()

    if (washerError || !washerData) {
      return { data: null, error: washerError ? (washerError as Error) : new Error('Failed to create washer') }
    }

    // Subir imágenes si hay
    const imageUrls: string[] = []
    if (formData.images.length > 0) {
      console.log(`📸 Subiendo ${formData.images.length} imagen(es) para lavadora ${washerData.id}`)
      
      for (let i = 0; i < formData.images.length; i++) {
        const image = formData.images[i]
        console.log(`📤 Subiendo imagen ${i + 1}/${formData.images.length}`)
        const imageUrl = await uploadWasherImage(image, washerData.id)
        if (imageUrl) {
          imageUrls.push(imageUrl)
          console.log(`✅ Imagen ${i + 1} subida:`, imageUrl)
        } else {
          console.warn(`⚠️ No se pudo subir la imagen ${i + 1}`)
        }
      }

      console.log(`📋 Total de URLs de imágenes: ${imageUrls.length}`, imageUrls)

      // Actualizar la lavadora con las URLs de las imágenes
      const { data: updatedData, error: updateError } = await supabase
        .from('washers')
        .update({ image_urls: imageUrls })
        .eq('id', washerData.id)
        .select()
        .single()

      if (updateError) {
        console.error('❌ Error updating washer with images:', updateError)
        // Retornar la lavadora aunque falle la actualización de imágenes
        return { data: washerData as Washer, error: null }
      }

      console.log('✅ Lavadora actualizada con imágenes:', updatedData)
      return { data: updatedData as Washer, error: null }
    }

    return { data: washerData as Washer, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

export const updateWasher = async (
  id: string,
  formData: Partial<WasherFormData>,
  existingImageUrls: string[] = [],
  imagesToRemove: string[] = []
): Promise<{ data: Washer | null; error: Error | null }> => {
  try {
    // Eliminar imágenes que se removieron
    if (imagesToRemove.length > 0) {
      for (const url of imagesToRemove) {
        await deleteWasherImage(url)
      }
    }

    // Subir nuevas imágenes si hay
    const newImageUrls: string[] = []
    if (formData.images && formData.images.length > 0) {
      for (const image of formData.images) {
        const imageUrl = await uploadWasherImage(image, id)
        if (imageUrl) {
          newImageUrls.push(imageUrl)
        }
      }
    }

    // Combinar URLs existentes (que no se eliminaron) con nuevas
    const remainingUrls = existingImageUrls.filter(url => !imagesToRemove.includes(url))
    const allImageUrls = [...remainingUrls, ...newImageUrls]

    // Actualizar la lavadora
    const updateData: Partial<Washer> = {}
    if (formData.brand !== undefined) updateData.brand = formData.brand.trim()
    if (formData.model !== undefined) updateData.model = formData.model.trim()
    if (formData.price !== undefined) updateData.price = formData.price.trim()
    if (formData.status !== undefined) updateData.status = formData.status
    if (formData.images !== undefined) updateData.image_urls = allImageUrls

    const { data, error } = await supabase
      .from('washers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return { data: null, error: error as Error }
    }

    return { data: data as Washer, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

export const deleteWasher = async (id: string, imageUrls: string[]): Promise<{ error: Error | null }> => {
  try {
    // Eliminar todas las imágenes del Storage
    if (imageUrls.length > 0) {
      for (const url of imageUrls) {
        await deleteWasherImage(url)
      }
    }

    // Eliminar la lavadora de la base de datos
    const { error } = await supabase
      .from('washers')
      .delete()
      .eq('id', id)

    if (error) {
      return { error: error as Error }
    }

    return { error: null }
  } catch (error) {
    return { error: error as Error }
  }
}

export const uploadWasherImage = async (file: File, washerId: string): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${washerId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${fileName}`

    console.log('📤 Subiendo imagen:', {
      bucket: BUCKET_NAME,
      filePath,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    })

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('❌ Error uploading image:', uploadError)
      console.error('Error details:', {
        message: uploadError.message,
        statusCode: uploadError.statusCode,
        error: uploadError.error
      })
      return null
    }

    console.log('✅ Imagen subida exitosamente:', uploadData)

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath)

    const publicUrl = urlData.publicUrl
    console.log('🔗 URL pública generada:', publicUrl)

    return publicUrl
  } catch (error) {
    console.error('❌ Error in uploadWasherImage:', error)
    return null
  }
}

export const deleteWasherImage = async (url: string): Promise<{ error: Error | null }> => {
  try {
    // Extraer el path del archivo de la URL
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/')
    const bucketIndex = pathParts.findIndex(part => part === BUCKET_NAME)
    
    if (bucketIndex === -1) {
      return { error: new Error('Invalid image URL') }
    }

    const filePath = pathParts.slice(bucketIndex + 1).join('/')

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath])

    if (error) {
      return { error: error as Error }
    }

    return { error: null }
  } catch (error) {
    return { error: error as Error }
  }
}
