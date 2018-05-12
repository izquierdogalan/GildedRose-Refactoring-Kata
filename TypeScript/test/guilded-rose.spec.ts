import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {


    it('once_sell_by_date_has_passed_quality_degrades_twice_as_fast', function() {
        const gildedRose = new GildedRose([ new Item('egg', 1, 6) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(5);
    });


    it('the_quality_of_an_item_is_never_negative', function() {
        const gildedRose = new GildedRose([ new Item('egg', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

    it('aged_brie_increases_quality_and_return_increased_quality', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 51, 49) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
    });

    it('item_with_max_quality_return_the_same', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 51, 50) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
    });

    it('sulfuras_not_quality_impact', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 0, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(10);
    });

    it('sulfuras_not_has_sold', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 51, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(51);
    });

    it('backstage_passes_with_ten_days_or_less_and_increase_two', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 7, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(12);
    });

    it('backstage_passes_with_more_ten_days_and_increase_one', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(11);
    });

    it('backstage_passes_with_five_days_and_increase_three', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(13);
    });

    it('backstage_passes_with_less_than_five_days_and_increase_three', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 4, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(13);
    });

    it('backstage_passes_without_selling_and_quality_zero', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

    it('conjured_without_selling_degrade_quality_double_than_normal_products', function() {
        const gildedRose = new GildedRose([ new Item('Conjured', 0, 6) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(4);
    });


});
