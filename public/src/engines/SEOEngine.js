
        // ==========================
        // engines/seo.engine.js
        // ==========================
        export const SEOEngine = (() => {
            return {
                generateReasoning: (category, product, vehicle) => {
                    if(!product) return "";
                    const turboStr = vehicle.aspiration === "Turbo" ? "menahan temperatur tinggi dari komponen turbin" : "menjaga efisiensi termal pembakaran";
                    switch(category) {
                        case 'OEM': return `Pelumas standar resmi pabrikan. Diformulasikan secara spesifik oleh engineer ${vehicle.brand} untuk menjaga garansi mesin ${vehicle.engineCode} tetap berlaku.`;
                        case 'Premium': return `Menggunakan Base Oil ${product.group} (${product.baseOil}). Struktur molekul sintetik murninya sangat resisten terhadap penguapan dan sempurna untuk ${turboStr}.`;
                        case 'Budget': return `Skor Value-for-Money tertinggi (${product.valueScore}/100). Memenuhi standar ${product.api} dengan harga ekonomis, ideal untuk penggunaan harian stop-and-go.`;
                        case 'Performance': return `Viskositas ${product.viscosity} menjaga kestabilan film oli di putaran RPM ekstrem. Resiko pemalsuan ${product.counterfeitRisk}, pastikan beli di toko resmi.`;
                        default: return "";
                    }
                },
                generateExecutiveSummary: (v) => {
                    const engineInfo = v.engine && v.engine.engineName ? v.engine.engineName : v.engineCode;
                    return `<strong>${v.brand} ${v.model} ${v.variant}</strong> generasi ${v.generation} yang dipasarkan di Indonesia antara tahun ${v.yearStart} hingga ${v.yearEnd} adalah ${v.segment} yang mengandalkan mesin <strong>${v.fuel} ${v.aspiration}</strong> berkode <strong>${engineInfo}</strong>. Untuk menjaga performa dan durabilitas, kendaraan ini membutuhkan penggantian oli sebanyak <strong>${v.oilCapacity} Liter</strong> (tergantung ukuran filter) secara rutin setiap <strong>${v.serviceInterval}</strong>. Pabrikan sangat merekomendasikan penggunaan pelumas dengan viskositas <strong>${v.oilGrade}</strong> yang memenuhi sertifikasi minimal <strong>${v.apiSpec}</strong>.`;
                },
                generateFAQ: (v) => {
                    let faqs = [];
                    faqs.push({ q: `Berapa kapasitas oli mesin ${v.brand} ${v.model} ${v.engineCode}?`, a: `Kapasitas oli mesin standar untuk ${v.brand} ${v.model} ${v.variant} (${v.yearStart}-${v.yearEnd}) adalah ${v.oilCapacity} Liter. Angka ini adalah estimasi penggantian total termasuk pergantian filter oli.` });
                    faqs.push({ q: `Kapan waktu yang tepat mengganti oli ${v.model}?`, a: `Berdasarkan panduan resmi pabrik, oli mesin dan filter wajib diganti setiap ${v.serviceInterval}. Namun, jika Anda sering berkendara di kemacetan ekstrem (Severe Condition), disarankan mengganti oli 20-30% lebih cepat.` });
                    if (v.engine && v.engine.knownIssues && v.engine.knownIssues.length > 0) {
                        faqs.push({ q: `Apa masalah umum pada mesin ${v.engineCode} ini?`, a: `Beberapa hal yang perlu diwaspadai dari mesin ${v.engineCode} ini adalah: ${v.engine.knownIssues.join(', ')}. Penggunaan oli premium dapat meminimalisir penumpukan residu penyebab masalah tersebut.` });
                    }
                    return faqs;
                }
            };
        })();
