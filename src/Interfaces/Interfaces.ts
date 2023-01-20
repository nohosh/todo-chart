export interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export interface BarDataType {
    labels: Number[]
     datasets: {
        label: string;
        data: Number[];
        backgroundColor: string[];
        borderColor: string;
        borderWidth: number;
    }[]
}