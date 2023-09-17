import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import { Button } from '../../components/button';
import { ContactItem } from '../../components/contactItem';
import { HeaderHandle } from '../../components/headerHandle';
import { withModalProvider } from './withModalProvider';
import { createContactListMockData } from '../../utilities/createMockData';

const DetachedExample = () => {
  // refs
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // variables
  const data = useMemo(() => createContactListMockData(2), []);

  // hooks
  const { bottom: safeBottomArea } = useSafeAreaInsets();

  // callbacks
  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current!.present();
  }, []);
  const handleDismissPress = useCallback(() => {
    bottomSheetRef.current!.dismiss();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  // renders
  const renderHeaderHandle = useCallback(
    props => <HeaderHandle {...props} children="Detached Example" />,
    []
  );
  const renderItem = useCallback(
    (item, index) => (
      <ContactItem
        key={`${item.name}.${index}`}
        title={`${index}: ${item.name}`}
        subTitle={item.jobTitle}
      />
    ),
    []
  );
  const renderFooter = useCallback(
    props => (
      <BottomSheetFooter {...props}>
        <View style={styles.footer}>
          <Text style={styles.footerText}>this is a footer!</Text>
        </View>
      </BottomSheetFooter>
    ),
    []
  );
  return (
    <View style={styles.container}>
      <Button label="Present" onPress={handlePresentPress} />
      <Button label="Dismiss" onPress={handleDismissPress} />
      <Button label="Close" onPress={handleClosePress} />
      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing={true}
        bottomInset={safeBottomArea + 34}
        enablePanDownToClose={true}
        style={styles.sheetContainer}
        backgroundComponent={null}
        footerComponent={renderFooter}
        handleComponent={renderHeaderHandle}
        detached={true}
      >
        <BottomSheetView
          style={styles.contentContainerStyle}
          enableFooterMarginAdjustment={true}
        >
          {data.map(renderItem)}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  sheetContainer: {
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16.0,

    elevation: 24,
  },
  contentContainerStyle: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    padding: 12,
    marginBottom: 12,
    borderRadius: 24,
    backgroundColor: '#80f',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default withModalProvider(DetachedExample);
