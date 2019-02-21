export interface Photo {
    id: number;
    postDate: Date;
    url: string;
    description: string;
    allowComments: boolean;
    likes: number;
    commnents: number;
    userId: number;
}
