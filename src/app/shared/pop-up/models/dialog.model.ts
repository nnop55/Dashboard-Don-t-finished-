export interface DialogData {
    data: any,
    fields: any[],
    title: string,
    editBtn: boolean,
    saveBtn: boolean,
    createBtn: boolean,
    deleteBtn: boolean,
    showSaveBtn: boolean,
    mode: string
}

export interface DialogMode {
    edit: boolean,
    save: boolean,
    create: boolean,
    delete: boolean,
    title: string,
    mode: string
}