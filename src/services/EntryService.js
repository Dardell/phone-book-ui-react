import axios from "axios";

const ENTRY_API_BASE_URL = "https://phone-book-my-api.herokuapp.com/api/v1/entries"

class EntryService{
    saveEntry(entry) {
        return axios.post(ENTRY_API_BASE_URL, entry);
    }

    getEntries() {
        return axios.get(ENTRY_API_BASE_URL);
    }

    deleteEntry(id) {
        return axios.delete(ENTRY_API_BASE_URL + "/" + id);
    }

    getEntryById(id){
        return axios.get(ENTRY_API_BASE_URL + "/" + id);
    }

    updateEntry(entry,id){
        return axios.put(ENTRY_API_BASE_URL + "/" + id, entry);
    }
}

export default new EntryService();