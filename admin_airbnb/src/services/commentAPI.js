import fetcher from "./fetcher";

const commentsAPI = {
    getComments : () => {
        return fetcher.get("binh-luan");
    },

    createComment : (values) => {
        return fetcher.post("binh-luan", values);
    },

    updateComment : (id, values) => {
        return fetcher.put(`binh-luan/${id}`, values);
    },

    deleteComment: (id) => {
        return fetcher.delete(`binh-luan/${id}`);
    }
}

export default commentsAPI;