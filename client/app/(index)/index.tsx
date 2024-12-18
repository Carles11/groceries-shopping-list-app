import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import ShoppingListItem from "@/components/ShoppingListItem";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { backgroundColors } from "@/constants/Colors";
import { useShoppingListIds } from "@/stores/ShoppingListsStore";

const ICON_COLOR = "#007AFF";

export default function HomeScreen() {
  const router = useRouter();
  const shoppingListIds = useShoppingListIds();

  const renderEmptyList = () => (
    <BodyScrollView contentContainerStyle={styles.emptyStateContainer}>
      <IconCircle
        emoji="🛒"
        backgroundColor={
          backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
        }
      />
      <Button onPress={() => router.push("/list/new")} variant="ghost">
        Create your first list
      </Button>
    </BodyScrollView>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Shopping lists",
          headerRight: () => (
            <Link href="/list/new">
              <IconSymbol size={24} name="plus" color={ICON_COLOR} />
            </Link>
          ),
          headerLeft: () => (
            <Link href="/profile">
              <IconSymbol size={22} name="person" color={ICON_COLOR} />
            </Link>
          ),
        }}
      />
      <FlatList
        data={shoppingListIds}
        renderItem={({ item: listId }) => <ShoppingListItem listId={listId} />}
        contentContainerStyle={styles.listContainer}
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent={renderEmptyList}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 8,
  },
  emptyStateContainer: {
    alignItems: "center",
    gap: 8,
    paddingTop: 100,
  },
});
