# Change Log

All notable changes to this project will be documented in this file.

# 1.12.0

- add a sizesOverride setting to allow setting sizes attribute in the source HTML ([add0043](https://github.com/nhoizey/images-responsiver/commit/add0043ed2fbaf9e13d5a2ebf324aeea2766ff9a)), closes [#191](https://github.com/nhoizey/images-responsiver/issues/191)

# 1.11.0

- support a "false" value for the data-responsiver attribute ([745d613](https://github.com/nhoizey/images-responsiver/commit/745d61398c8019bdb9876eafb1f7b50fc816c992))

## 1.10.0

- add support for data-src for lazy loaded images ([c5e6f6e](https://github.com/nhoizey/images-responsiver/commit/c5e6f6e8efe84e05645b2fd8bf5d1388ce6fa739))

## 1.9.0

- Replace basicHTML with LinkeDOM #138
  - basicHTML is deprecated, LinkeDOM recommended instead
  - Eleventy build with eleventy-plugin-images-responsiver is now **[approximatively 30 % faster](https://github.com/nhoizey/images-responsiver/issues/138#issuecomment-868592521)** 🎉

## 1.8.4

- Update BasicHTML dependency to fix issue with inline CSS custom properties https://github.com/WebReflection/basicHTML/issues/56

## 1.8.3

- Enhance basicHTML usage
- Enhance docs

## 1.8.2

- fix: ignores files with `permalink=false` that don't generate any HTML #90
- fix: don't add a second `<html>` tag if there's already one 98d75b7777dfc5b72603d8fdabacb85eff344f30

## 1.8.0

- Upgrade basicHTML to 2.3.0 5095851880c1c9a916c41008eef009cf66a3db23
- Make sure the parent is not a picture 979bad85619586fa3005227bdf9c27137dfc5ae0
- Don't set twice the same image width in srcset 979bad85619586fa3005227bdf9c27137dfc5ae0

## 1.6.4

- basichtml is now fixed! 👍 9211b73

## 1.6.3

- Quick fix for BasicHTML issue 8ff43eb

## 1.6.2

- Remove current documentation, waiting for full rewrite 1176884

## 1.6.1

- Make sure people don't put a `selector` property in a preset other than default 789cabf
- Add link to Cloudfour article 0dc4fb1

## 1.6.0

- Add tests and organize them a26a1c4
- Allow setting a list of widths instead of min and max f7787a4

## 1.5.1

- Fix link to homepage 78b2673
- Add debugging doc to readme 4e8eda9

## 1.5.0

- Add docs about debugging ddcc735
- Better default maxWidth 913bae0
- Don't put images larger than pristine image in srcset e3f0cd9
- Add debug dependency for better reporting of warnings c8c90fa

## 1.4.0

- Split tests into several sets 29e9c65
- Make sure maxWidth &gt; minWidth 8736ebb
- Make sure there are at least 2 steps for minWidth and maxWidth 1f80193
- Make it clear the plugin is required when using Eleventy cfb1b59

## 1.3.1

- Remove tests from the package e856e9c

## 1.3.0

- Remove one useless level in settings 09ba8e8

## 1.2.2

- Remove docs from npm package bf377bc

## 1.2.1

- Make sure it works for images with width inferior to minWidth option 515e00d

## 1.2.0

- 🐛 Make sure settings for one image are not reused for the next one a0b9a04
- 🦋 Enhance example code with Prettier 97b2f3f
- Add comments in scripts 79411f7
- Split tutorial in several steps 6a446a8
- Use clean snapshots with Prettier c19504f
- Options parameter is optional 24f9f53

## 1.1.0

- Prettier db4126e
- Filter out images without a src, or not SVG, or with already a srcset 823ed6a

## 1.0.0

- Pass document to the hooks 7eb4d36
- Fine tune ESLint and Prettier configuration fedcfe6
- Lint and make prettier aaa5d0a

## 0.15.0

This release adds `runBefore` and `runAfter` hook methods to manipulate the image (geet data, modify it, etc.) before and after it's been "responsivised".

- be strict for tests 0af2952
- Upgrade BasicHTML in lock file 25da11c
- Add runBefore and runAfter hook methods 39ed728
- Upgrade BasicHTML module 0a95d38
- Rename the example ddbcf10

## 0.14.0

This release replaces JSDOM with BasicHTML to use less memory.
Thanks @ziir! 🙏

- Add Prettier config d57ccdb
- Upgrading BasicHTML 3d0def7
- Merge pull request #4 from nhoizey/pr/3 3bbd7b2
- Merge pull request #3 from ziir/use-basichtml 34771bd
- Fix tests 4f38a05
- Use basicHTML over JSDOM 47d9f66
- These should not be here a80ad35

## 0.13.2

- Add a bad example for memory issue 0ea9bf4
- Options can be empty 00e6851
- Make sure to load the right page 0d60d4f
- Arrange doccs a0f4cbd
- Remove useless preset 466777a

## 0.13.1

- Additional documentation 002ebbf
- Simplify the example c1cd462

## 0.13.0

- Add documentation 6a36911
- Use the real jsdom package 8a82e9b
- Rename license file bd4ce85
- Update tests d4d26a6
- No need for a message, this is overly verbose 6e0cba7
- Why would it not work with relative URLs? 99ee24a
- No need for a message, this is not a linter (bis) 0e251b7
- No need for a message, this is not a linter dba53e3
- This is now useless 9e00717
- These settings have to be managed differently 76b33c9
- Load jsdom only when needed b66964f
- Try to clean memory 818a3bb
- Use jsdom's serialize() method adbc94f
- Use the dataset API 16a5d4a
- Use the image's dataset instead of a class to define preset(s) to use 43ac9e9
- Provide an example 0e83d49

## 0.12.0

- Provide the main entry point 1991d2a
- Remove leftovers 😅 f4e8bf1

## 0.11.0

- Typo in the method name e0364f9

## 0.10.0

- CSS typo ef8ad4a
- Don't change images that already have a srcset attribute ef09d8b

## 0.9.0

- Exit ASAP if the image can't be transformed 0937e32
- Add tests for relative URL and SVG files ea97b83

## 0.8.0

- Don't try anything on SVG images 76ee8e8

## 0.7.1

- Typo 9407e75

## 0.7.0

- More explicit messages 265a20e
