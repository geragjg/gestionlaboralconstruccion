module.exports = {
    style: {
      postcss: {
        mode: "extends",
        loaderOptions: (postcssLoaderOptions) => {
          // Skip processing for semantic.min.css
          postcssLoaderOptions.plugins = (loader) => {
            if (loader.resourcePath.includes('semantic.min.css')) {
              return [];
            }
            return [
              require('tailwindcss'),
              require('autoprefixer'),
            ];
          };
          return postcssLoaderOptions;
        },
      },
    },
  }