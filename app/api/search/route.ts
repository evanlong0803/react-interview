import { NextRequest, NextResponse } from 'next/server'

const searchRelayUrl = 'https://api.github.com/search/repositories'

type Data = {
  items?: any[]
  error?: string
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const q = searchParams.get('q')
  
  if (!q) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 })
  }

  const params = new URLSearchParams({
    q,
    per_page: '20',
  }).toString()
  
  try {
    const apiResponse = await fetch(`${searchRelayUrl}?${params}`)
    const { items }: Data = await apiResponse.json()
    return NextResponse.json({ items })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
