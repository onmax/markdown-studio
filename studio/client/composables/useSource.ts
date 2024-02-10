const viteUrl = import.meta.env.VITE_API_URL

export function useSource() {
  const baseUrl = ref('')
  const route = useRoute()

  async function getContent() {
    if (!baseUrl.value)
      baseUrl.value = await fetch(`${viteUrl}/get-base-url`).then(res => res.json()).then(r => r.baseUrl)
    console.log({ baseUrl: baseUrl.value })

    const path = `${viteUrl}/${route.path.replace(/\/$/, '')}`
    const res = await fetch(path)
    console.log({ res, path })
  }

  return {
    getContent,
  }
}
