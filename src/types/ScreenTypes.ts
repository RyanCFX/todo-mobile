import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RequestProps } from "./Request";
import { GroupProps } from "./Group";
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList>;
  Home: undefined;
  Welcome: undefined;
  Signin: undefined;
  Signup: undefined;
  AddGroup: undefined;
  AddTask: { group: GroupProps };
  Tasks: { group: GroupProps };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  MyPostCards: undefined;
  Store: undefined;
  Marketplace: undefined;
  Profile: undefined;
};
