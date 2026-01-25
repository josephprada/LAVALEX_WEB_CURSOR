export interface Washer {
  id: string
  brand: string
  model: string
  price: string
  status: string
  image_urls: string[]
  created_at?: string
  updated_at?: string
}

export interface WasherFormData {
  brand: string
  model: string
  price: string
  status: string
  images: File[]
}
