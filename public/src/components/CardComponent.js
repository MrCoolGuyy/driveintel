const formatRupiah = (num) => "Rp " + num.toLocaleString("id-ID");

export const CardComponent = (() => {
    return {
        renderDecision: (decisionObj, badgeTitle, badgeIcon, badgeBg, highlightColor) => {
            const p = decisionObj.product;

            if (!p) return "";

            return `
                <div class="bg-white rounded-xl border-2 border-slate-100 hover:border-${highlightColor}-400 overflow-hidden shadow-sm hover:shadow-lg transition-all relative flex flex-col h-full">

                    <div class="absolute top-0 right-0 ${badgeBg} text-white text-xs font-bold px-3 py-1.5 rounded-bl-lg shadow-sm flex items-center gap-1.5">
                        <i data-lucide="${badgeIcon}" class="w-3.5 h-3.5"></i>
                        ${badgeTitle}
                    </div>

                    <div class="p-5 pt-8 flex-grow">

                        <div class="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                            ${p.brand} | ${p.baseOil}
                        </div>

                        <h4 class="font-bold text-slate-800 text-lg mb-2 leading-tight">
                            ${p.productName}
                        </h4>

                        <p class="text-sm text-slate-600 mb-4 leading-relaxed">
                            ${decisionObj.reason}
                        </p>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-semibold border border-slate-200">
                                API ${p.api}
                            </span>

                            <span class="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-semibold border border-blue-200">
                                ${p.viscosity}
                            </span>
                        </div>

                    </div>

                    <div class="bg-slate-50 p-4 border-t border-slate-100 mt-auto">

                        <div class="flex justify-between items-center mb-3">

                            <span class="text-xs font-bold text-slate-500 uppercase">
                                Estimasi Harga
                            </span>

                            <span class="text-lg font-extrabold text-${highlightColor}-700">
                                ${formatRupiah(p.price)}
                            </span>

                        </div>

                        <div class="grid grid-cols-2 gap-2">

                            <a href="${p.tokopedia}" target="_blank"
                               class="text-center py-2.5 rounded-lg text-green-800 bg-green-100 hover:bg-green-200 font-bold text-sm transition-colors flex items-center justify-center gap-1.5">
                                <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                                Tokopedia
                            </a>

                            <a href="${p.shopee}" target="_blank"
                               class="text-center py-2.5 rounded-lg text-orange-800 bg-orange-100 hover:bg-orange-200 font-bold text-sm transition-colors flex items-center justify-center gap-1.5">
                                <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                                Shopee
                            </a>

                        </div>

                    </div>

                </div>
            `;
        }
    };
})();