export type MainCardProps = {
    cardTitle: string
};

export type Set = {
    repetitions: string,
    rest: number,
}

export type Exercise = {
    _id: string,
    name: string,
    targetMuscle?: string,
    equipmentRequired?: string,
    instruction?: string
    sets: Set[]
}

export type Day = {
    _id: string,
    name: string,
    isPublic: boolean,
    exercises?: Exercise[]
}

export type PlanData = {
    _id: string,
    name: string,
    planType: string,
    createdBy: string,
    isPublic: boolean,
    difficultyLevel: string,
    description?: string,
    days?: Day[]
}

export type PlanDataResponse = {
    planData: PlanData[]
}

export type UserDataResponse = {
    _id: string,
    clerkId: string,
    email: string,
    first_name: string,
    last_name: string,
    isAdmin: boolean,
    age: number,
    fitness_level: string,
    role: string
}