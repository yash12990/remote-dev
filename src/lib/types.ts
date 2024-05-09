export type JobItem = {
    id: number;
    badgeLetters: string;
    title: string;
    company: string;
    date: string;
    relevanceScore: number;
    daysAgo: number;
}
export type JobItemExpanded = JobItem & {
    description: string;
    qualifications: string[];   //Array of strings
    reviews: Array<string>;     //Array of strings
    duration: string;
    location: string;
    salary: string;
    coverImgURL: string;
    companyURL: string;
}

export type PageDirection = "next" | "prev";

export type SortBy = "relevant" | "recent";