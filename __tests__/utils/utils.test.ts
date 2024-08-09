import { capitalize, getBreedInfo } from '@/app/utils/utils';

describe('Utils functions', () => {
    it('should capitalize any random text', () => {
        const items = ["akita","beagle","australian shepherd"];
        const expecteds = ["Akita","Beagle","Australian Shepherd"];

        for(let i = 0; i < items.length; i++) {
            const capitalizedText = capitalize(items[i]);
            expect(capitalizedText).toEqual(expecteds[i]);
        }
    })

    it('should capitalize breed name from url', () => {
        const urls = [
            "https://images.dog.ceo/breeds/african/",
            "https://images.dog.ceo/breeds/akita/",
            "https://images.dog.ceo/breeds/australian-shepherd/",
          ];
          const capitalizedExpected = ["African", "Akita", "Australian Shepherd"];
      
          urls.map((url, index) => {
            const breedName = getBreedInfo(url);
            const capitalized = capitalizedExpected[index];
            expect(breedName).toEqual(capitalized);
          });
    })

    it('should call getBreedInfo with undefined', () => {
        const breedName = getBreedInfo();
        expect(breedName).toBe("");
    });
})