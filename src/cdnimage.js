CMS.registerEditorComponent({
    id: "cdnimage",
    label: "cdnimage",
    fields: [{
        name: "title",
        label: "Title",
        widget: "string",
    }, {
        name: "alt",
        label: "Description",
        widget: "string"
    }, {
        name: "src",
        label: "Image",
        widget: "image"
    }],
    pattern: /{{<\s*cdnimage(.*)>}}/,
    fromBlock: function (input) {
        let output = {alt: "", src: "", title: ""}
        let options = input[1].match(/\w+\s*=\s*"[^"]*"/g);
        if (options) {
            options.forEach((i) => {
                const keyValue = i.split("=");
                output = {...output, [keyValue[0]]: keyValue[1].replace(/"/g, '')}
            });
        }
        return output;
    },
    toBlock: function (obj) {
        return `{{< cdnimage ${obj.src}>}}`;
    },
    toPreview: ({title, alt, src}, getAsset, fields) => {
        const imageField = fields?.find(f => f.get('widget') === 'image');
        const imgSrc = getAsset(src, imageField);
        return `{{< cdnimage ${imgSrc} >}}`;
    },
});