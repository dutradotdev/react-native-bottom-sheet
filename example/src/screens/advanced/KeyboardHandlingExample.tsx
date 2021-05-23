import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import SearchHandle from '../../components/searchHandle';
import Button from '../../components/button';
import ContactList from '../../components/contactList';

const KeyboardHandlingExample = () => {
  // state
  const [keyboardBehavior, setKeyboardBehavior] =
    useState<'none' | 'extend' | 'fillParent' | 'interactive'>('none');
  const [keyboardBlurBehavior, setKeyboardBlurBehavior] =
    useState<'none' | 'restore'>('none');

  // hooks
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [100, 300], []);

  // callbacks
  const handleToggleKeyboardBehavior = useCallback(() => {
    setKeyboardBehavior(state => {
      switch (state) {
        case 'none':
          return 'extend';
        case 'extend':
          return 'fillParent';
        case 'fillParent':
          return 'interactive';
        case 'interactive':
          return 'none';
      }
    });
  }, []);
  const handleToggleKeyboardBlurBehavior = useCallback(() => {
    setKeyboardBlurBehavior(state => {
      switch (state) {
        case 'none':
          return 'restore';
        case 'restore':
          return 'none';
      }
    });
  }, []);
  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <Button
        label={`Toggle Keyboard Behavior: ${keyboardBehavior}`}
        onPress={handleToggleKeyboardBehavior}
      />
      <Button
        label={`Toggle Keyboard Blur Behavior: ${keyboardBlurBehavior}`}
        onPress={handleToggleKeyboardBlurBehavior}
      />
      <Button label="Expand" onPress={handleExpandPress} />
      <Button label="Collapse" onPress={handleCollapsePress} />
      <Button label="Close" onPress={handleClosePress} />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        keyboardBehavior={keyboardBehavior}
        keyboardBlurBehavior={keyboardBlurBehavior}
        handleComponent={SearchHandle}
      >
        <ContactList count={10} type="FlatList" />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default KeyboardHandlingExample;