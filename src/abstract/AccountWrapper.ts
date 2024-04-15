
import AccountEntry from "./AccountEntry";

// TODO: validation methods for all interfaces
// TODO: parsing methods
export default interface AccountWrapper {
    name: string,
    total: number,
    entries: AccountEntry[]
}