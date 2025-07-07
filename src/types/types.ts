interface Fact {
    text: string;
    found: boolean;
    number: number;
    type: string;
    date: string;
}

interface CustomFact {
    key: string;
    number: string;
    type: string;
    text: string;
}

interface FormValues {
    type: string;
    number?: string;
    isRandom: boolean;
};


export type { Fact, CustomFact, FormValues }