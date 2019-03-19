// posts are identified by their slugs

module.exports = f => {
  const cache = {}

  return async (slug = '/') => {
    const cached = cache[slug]

    if (cached !== undefined) return cached

    const result = await Promise.resolve(f(slug))
    cache[slug] = result

    return result
  }
}
