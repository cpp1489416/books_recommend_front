export default {
    sleep: function (d) {
        return new Promise((resolve) => setTimeout(resolve, d));
    }
}
