export class ItemFileManager {
    id: string;
    name: string;
    icon: string;
    type: string;
    children: Array<ItemFileManager> = [];
    constructor(id, name, icon = null, type = null) {
        this.id = id;
        this.name = name;
        if (icon) this.icon = icon;
        if (type) this.type = type;
    }
    public update(name, icon = null) {
        this.name = name;
        if (icon) this.icon = icon;
    }
}