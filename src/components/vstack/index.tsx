// MODULOS DE REACT
import React from 'react';
import { View } from 'react-native';

// MODULOS LOCALES
import { VStackAtrr } from '@/src/types/VStack';
import RenderIf from '../renderIf';

export default function VStack({ children, space, style }: VStackAtrr) {
  return (
    <View style={style}>
      {children?.length > 1
        ? children?.map((component, index) => {
          const isAbsolute =
            React.Children.only(component)?.props?.style?.position ===
            'absolute';

          if (Array?.isArray(component)) {
            const isAbsolute =
              React.Children.only(component)?.props?.style?.position ===
              'absolute';

            return component?.map((subComponent, subIndex) => (
              // <View
              //   key={subIndex}
              //   style={[
              //     !isAbsolute && {
              //       marginVertical: SPACE_HALF,
              //       marginTop: subIndex === 0 ? 0 : SPACE_HALF,
              //     },
              //   ]}>
              //   {subComponent}
              // </View>
              <View key={subIndex}>
                <RenderIf condition={subIndex !== 0}>
                  <View style={{ width: '100%', height: space }} />
                </RenderIf>
                {subComponent}
              </View>
            ));
          }

          return (
            // <View key={index}>
            //   <View
            //     style={[
            //       !isAbsolute && {
            //         marginVertical: SPACE_HALF,
            //         marginTop: index === 0 ? 0 : SPACE_HALF,
            //       },
            //     ]}>
            //     {component}
            //   </View>
            //   <View style={{marginVertical: SPACE_HALF}} />
            // </View>
            <View key={index}>
              <RenderIf condition={index !== 0}>
                <View style={{ width: '100%', height: space }} />
              </RenderIf>
              {component}
            </View>
          );
        })
        : children}
    </View>
  );
}
