
export const queue = {
    storate: [],
    enqueue: (value) => {
        this.storage.push(value);
    },
    dequeue: () => {
        return this.storage.shift();
    },
    isEmpty: () => {
        return !this.storage.lenght;
    },
}