import Writer from '@mpietrucha/prettier/writer'

class Ignore {
    attach(watcher) {
        this.watcher = watcher
    }

    async start(file) {
        await this.watcher.unwatch(file)
    }

    stop(file) {
        this.watcher.add(file)
    }
}

export default (options = {}) => {
    const [writer, ignore] = [new Writer(), new Ignore()]

    writer.using({
        after: ignore.stop.bind(ignore),
        before: ignore.start.bind(ignore),
    })

    const name = 'vite-plugin-prettier'

    const buildStart = () => writer.all(options)

    const watchChange = file => writer.write(file, options)

    const configResolved = ({ root }) => writer.using({ root })

    const configureServer = ({ watcher }) => {
        writer.using({
            ignore: watcher.options.ignored,
        })

        ignore.attach(watcher)
    }

    return {
        name,
        buildStart,
        watchChange,
        configResolved,
        configureServer,
    }
}
