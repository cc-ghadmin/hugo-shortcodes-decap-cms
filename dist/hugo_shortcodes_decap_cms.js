// cdnimage.js
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
// figure.js
CMS.registerEditorComponent({
    id: "figure",
    label: "Figure",
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
    pattern: /{{<\s*figure(.*)>}}/,
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
        let options = "";
        options += obj.src ? ` src="${obj.src}"` : '';
        options += obj.alt ? ` alt="${obj.alt}"` : '';
        options += obj.title ? ` title="${obj.title}"` : '';
        return `{{< figure ${options}>}}`;
    },
    toPreview: ({title, alt, src}, getAsset, fields) => {
        const imageField = fields?.find(f => f.get('widget') === 'image');
        const imgSrc = getAsset(src, imageField);
        return `<figure><p><img src="${imgSrc}" alt="${alt}" title="${title}" class="lightense-target"><em>${title}</em></p></figure>`;
    },
});
// gist.js
CMS.registerEditorComponent({
    id: "gist",
    label: "Gist",
    fields: [{
            name: "username",
            label: "Github Username",
            widget: "string"
        },
        {
            name: "gid",
            label: "Gist ID",
            widget: "string"
        },
    ],
    pattern: /{{< gist ([a-zA-Z0-9]+) ([a-zA-Z0-9]+) >}}/,
    fromBlock: function(match) {
        return {
            username: match[1],
            gid: match[2],
        };
    },
    toBlock: function(obj) {
        return `{{< gist ${obj.username} ${obj.gid} >}}`;
    },
    toPreview: function(obj) {
        return `{{< gist ${obj.username} ${obj.gid} >}}`;
    },
});
// instagram.js
CMS.registerEditorComponent({
    id: "instagram",
    label: "Instagram",
    fields: [
      {
          name: "pid",
          label: "Post id",
          widget: "string"
      },
      {
        name: "hidecaption",
        label: "Hide caption",
        widget: "boolean"
      }
    ],
    pattern: /{{< instagram (?<pid>[a-zA-Z0-9]+)\s{0,}(?<hidecaption_flag>hidecaption)?\s+>}}/,
    fromBlock: function(match) {
        return {
            pid: match[1],
            hidecaption: match[2]
        };
    },
    toBlock: function(obj) {
        return `{{< instagram ${obj.pid} ${
          obj.hidecaption ? "hidecaption " : ""
        }>}}`;
    },
    toPreview: function(obj) {
        return `{{< instagram ${obj.pid} ${
          obj.hidecaption ? "hidecaption " : ""
        }>}}`;
    },
});
// twitter.js
CMS.registerEditorComponent({
    id: "twitter",
    label: "Twitter",
    fields: [{
        name: "tid",
        label: "Tweet id",
        widget: "string"
    }],
    pattern: /{{< tweet ([a-zA-Z0-9]+) >}}/,
    fromBlock: function(match) {
        return {
            tid: match[1]
        };
    },
    toBlock: function(obj) {
        return `{{< tweet ${obj.tid} >}}`;
    },
    toPreview: function(obj) {
        return `{{< tweet ${obj.tid} >}}`;
    },
});
// vimeo.js
CMS.registerEditorComponent({
    id: "vimeo",
    label: "Vimeo",
    fields: [{
        name: "shortcode",
        label: "Vimeo shortcode",
        widget: "string"
    }],
    pattern: /{{< vimeo ([a-zA-Z0-9]+) >}}/,
    fromBlock: function(match) {
        return {
            shortcode: match[1]
        };
    },
    toBlock: function(obj) {
        return `{{< vimeo ${obj.shortcode} >}}`;
    },
    toPreview: function(obj) {
        return `{{< vimeo ${obj.shortcode} >}}`;
    },
});
// youtube.js
CMS.registerEditorComponent({
    id: "youtube",
    label: "Youtube",
    fields: [{
        name: "id",
        label: "Youtube Video ID",
        widget: "string"
    }],
    pattern: /{{< youtube\s+(?<id>[A-Za-z0-9\-]+)\s+>}}/,
    fromBlock: function(match) {
        return {
            id: match[1],
        };
    },
    toBlock: function(obj) {
        return `{{< youtube ${obj.id} >}}`;
    },
    toPreview: function(obj) {
        return `<img src="https://i3.ytimg.com/vi/${obj.id}/hqdefault.jpg" alt="Youtube Video"/>`;
    },
});
