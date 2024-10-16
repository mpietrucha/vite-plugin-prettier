import Writer from '@mpietrucha/prettier/writer'

const writer = new Writer()

export default (options = {}) => {
    const name = 'vite-plugin-prettier'

    const buildStart = () => writer.all(options)

    const watchChange = file => writer.write(file, options)

    const configResolved = ({ root }) => writer.using({ root })

    const configureServer = ({ watcher }) => {
        writer.using({ ignore: watcher.options.ignored })
    }

    return {
        name,
        buildStart,
        watchChange,
        configResolved,
        configureServer,
    }
}
