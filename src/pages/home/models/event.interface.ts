import { Team } from "./team.interface";

export interface Event {
    match_id: string,
    country_name: string,
    league_name: string,
    match_time: string,
    match_hometeam_name: string,
    match_awayteam_name: string
}