export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = []) {
        this.items = items;
    }

    updateQualityWithLimit(quality, limit) {
        if (quality < limit) {
            quality = quality + 1;
        }

        return quality;
    }

    isAgedBrie(name) {
        return name == 'Aged Brie'
    }

    isBackStagePass(name){
        return name == 'Backstage passes to a TAFKAL80ETC concert';
    }

    isSulfuras(name) {
        return name == 'Sulfuras, Hand of Ragnaros';
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            let name = this.items[i].name;
            let quality = this.items[i].quality;
            let sellIn = this.items[i].sellIn;

            let isAgeBrie = this.isAgedBrie(name);
            let isBackStagePass = this.isBackStagePass(name);
            let isSulfuras = this.isSulfuras(name);

            if (!isAgeBrie && !isBackStagePass) {
                if (quality > 0) {
                    if (!isSulfuras) {
                        quality = quality - 1
                    }
                }
            } else {
                if (quality < 50) {
                    quality = quality + 1
                    if (isBackStagePass) {
                        if (sellIn < 11) {
                            quality = this.updateQualityWithLimit(quality, 50);
                        }
                        if (sellIn < 6) {
                           quality = this.updateQualityWithLimit(quality, 50);
                        }
                    }
                }
            }

            if (!isSulfuras) {
                sellIn = sellIn - 1;
            }

            if (sellIn < 0) {
                if (!isAgeBrie) {
                    if (!isBackStagePass) {
                        if (quality > 0) {
                            if (!isSulfuras) {
                                quality = quality - 1
                            }
                        }
                    } else {
                        quality = quality - quality
                    }
                } else {
                    quality = this.updateQualityWithLimit(quality, 50);
                }
            }

            this.items[i].quality = quality;
            this.items[i].sellIn = sellIn;
            this.items[i].name = name;
        }


        return this.items;
    }
}
