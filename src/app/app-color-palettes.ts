interface IPalette {
  name: string;
}

const availablePalettes: Array<IPalette> = [
  {
    name: 'palette-1'
  },
  {
    name: 'palette-2'
  }
];

// select the default color palette
const defaultPalette: IPalette = availablePalettes.find((palette: IPalette) => {
  return palette.name === 'palette-1';
  // return palette.name === 'palette-2';
});

export { IPalette, availablePalettes, defaultPalette };
