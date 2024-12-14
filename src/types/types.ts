export type MainCardProps = {
    cardTitle: string
};

export type Exercise = {
    _id: string,
    name: string,
    targetMuscle: string,
    equipmentRequired: string,
    instruction?: string
}

export type Day = {
    _id: string,
    dayName: string,
    exercise: Exercise[]
}

export type PlanData = {
    _id: string,
    name: string,
    planType: string,
    isPublic: boolean,
    difficultyLevel: string,
    description?: string,
    days: Day[]
}

export type PlanDataResponse = {
    planData: PlanData[]
}