

import { Match } from "./match.interface";

export interface PickOfPost {
    Id: number,
    PickResult: number,
    Description: string,
    Odd: number
    GetAllMatchOfPick: Match []
}