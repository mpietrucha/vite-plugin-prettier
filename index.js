import Writer from '@mpietrucha/prettier/writer'

class Builder {
    build(watcher, cache) {
        const ignore = watcher.options.ignored

        const writer = new Writer({
            cache,
            ignore,
        })

        ignore.push(...writer.ignored(ignore))

        this.writer = writer
    }

    get() {
        if (this.writer) {
            return this.writer
        }

        throw new Error('Cannot access Writer instance before initialization.')
    }
}

const builder = new Builder()

export default (options = {}) => {
    const { cache, ...config } = options

    const name = 'vite-plugin-prettier'

    const buildStart = () => builder.get().all(config)

    const watchChange = file => builder.get().write(file, config)

    const configureServer = ({ watcher }) => builder.build(watcher, cache)

    return {
        name,
        buildStart,
        watchChange,
        configureServer,
    }
}
