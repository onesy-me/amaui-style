/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';
import { TValue } from '../src';

group('@amaui/style/style', () => {

  group('browser', () => {

    to('style', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

        // Plugins
        amauiStyle.plugins.add = [
          window.AmauiStyle.unit,
          window.AmauiStyle.sort,
          window.AmauiStyle.prefix,
          window.AmauiStyle.makeClassName,
          window.AmauiStyle.rtl,
        ];

        const a = {
          a: {
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingLeft: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          },

          a7: {
            // Function
            background: props => props.a === 1 ? 'yellow' : 'orange',
          },
        };

        const style = window.AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

        // Add
        style.add();

        let valueCSS = ``;

        Array.from(document.styleSheets).forEach(styleSheet => {
          Array.from(styleSheet.cssRules).forEach(cssRule => valueCSS += `\n${cssRule.cssText}`);
        });

        return [
          window.document.styleSheets.length,
          Object.keys(style),
          style.amaui_style_sheet_manager.status === 'active',
          valueCSS,
          amauiStyle.css,
        ];
      });

      const values = [...valueBrowsers];

      assert(values[0]).eql([
        2,
        [
          "ids",
          "amaui_style_sheet_manager",
          "sheets",
          "add",
          "props",
          "update",
          "remove",
          "addRule"
        ],
        true,
        "\n.aa { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\n.ab { background: orange; }",
        "\n\n.aa {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.ab {\n  background: orange;\n}\n\n"
      ]);

      assert(values[1]).eql([
        2,
        [
          "ids",
          "amaui_style_sheet_manager",
          "sheets",
          "add",
          "props",
          "update",
          "remove",
          "addRule"
        ],
        true,
        "\n.aa { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\n.ab { background: orange none repeat scroll 0% 0%; }",
        "\n\n.aa {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.ab {\n  background: orange;\n}\n\n"
      ]);

      assert(values[2]).eql([
        2,
        [
          "ids",
          "amaui_style_sheet_manager",
          "sheets",
          "add",
          "props",
          "update",
          "remove",
          "addRule"
        ],
        true,
        "\n.aa { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\n.ab { background-color: orange; }",
        "\n\n.aa {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.ab {\n  background: orange;\n}\n\n"
      ]);
    });

  });

  group('node', () => {

    to('style', async () => {
      const amauiStyle = new AmauiStyle.AmauiStyle();

      // Plugins
      amauiStyle.plugins.add = [
        AmauiStyle.unit,
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.makeClassName,
        AmauiStyle.rtl,
      ];

      const a: TValue = {
        a: {
          width: 100,

          'max-width': 100,

          // Simple
          background: '#faa',

          margin: '0 14px 4px 40px',

          // rtl
          marginLeft: 41,
          float: 'left',

          // sort
          paddingLeft: 41,
          padding: 40,

          // prefixes
          position: 'sticky',
          transition: 'all .4s ease',
          maskOrigin: 'inherit',
          maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
          maskPosition: '40% 74%',

          // animation
          animation: '$a .4s ease',
        },

        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const style = AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

      // Add
      style.add();

      const value = [
        Object.keys(style),
        style.amaui_style_sheet_manager.status === 'inited',
        amauiStyle.css,
      ];

      assert(value).eql([
        [
          "ids",
          "amaui_style_sheet_manager",
          "sheets",
          "add",
          "props",
          "update",
          "remove",
          "addRule"
        ],
        true,
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: orange;\n}\n\n"
      ]);
    });

  });

});
