export const SearchEngine = (() => {

    function normalize(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");
    }

    function evaluateSearchScore(query, target) {

        const q = normalize(query);
        const t = normalize(target);

        if (!q || !t) return 0;

        if (t.includes(q)) return 100;

        let qIdx = 0;
        let tIdx = 0;

        while (qIdx < q.length && tIdx < t.length) {

            if (q[qIdx] === t[tIdx]) qIdx++;

            tIdx++;

        }

        if (qIdx === q.length) return 50;

        return 0;

    }

    return {

        evaluateSearchScore

    };

})();