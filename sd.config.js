import { register, permutateThemes } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname } from 'node:path/posix';

register(StyleDictionary, {
  
});

async function run() {
  const tokens = JSON.parse(await readFile('tokens.json', 'utf-8'));
  const { $themes, ...sets } = tokens;

  const persistSet = async ([setName, setTokens]) => {
    const fileName = `tokens/build/${setName}.json`;
    const dirName = dirname(fileName);
    try {
      await mkdir(dirName, { recursive: true });
    } catch (e) {
      // do nothing, dir already exists
    }
    await writeFile(fileName, JSON.stringify(setTokens, null, 2), 'utf-8');
    
  };

  // persist sets as multi file in tokens folder
  await Promise.all(Object.entries(sets).map(persistSet));

  const themes = permutateThemes($themes, { separator: '_' });
  const configs = Object.entries(themes).map(([name, tokensets]) => ({    
    source: Object.keys(sets)
      .filter(setName => tokensets.includes(setName))
      .map(setName => `tokens/${setName}.json`),
    preprocessors: ['tokens-studio'], // <-- since 0.16.0 this must be explicit
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        files: [
          {
            destination: `vars-${name}.css`,
            format: 'css/variables',
          },
        ],
      },
    },
  }));
  console.log('configs');
  async function cleanAndBuild(cfg) {
    console.log('test');
    const sd = new StyleDictionary(cfg);
    await sd.cleanAllPlatforms(); // optionally, cleanup files first..
    await sd.buildAllPlatforms();
  }
  await Promise.all(configs.map(cleanAndBuild));
}

run();