import { CompositeNavigationProp, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ICategory } from "store/types";



export type CategoriesStackParamList ={
     Categories:undefined,
     Category:{
          category: ICategory
     },
     CreateCategory:{
          category?: ICategory
     },
     EditCategory:undefined,
}

export type HomeStackParamList ={
     Home:undefined,
     EditTask:undefined
}

export type RootBottomTabParamList ={
     HomeStack:NavigatorScreenParams<HomeStackParamList>,
     Today:undefined,
     Completed:undefined
     CategoriesStack:NavigatorScreenParams<CategoriesStackParamList>,
}

//
//
//

export type AppStackParamList ={
     Root:NavigatorScreenParams<RootBottomTabParamList>
     Setting:undefined
}

export type AuthStackParamList ={
     Welcome:undefined,
     Login:undefined,
     Signup:undefined
}

export type RootStackParamList ={
     AppStack:NavigatorScreenParams<AppStackParamList>
     AuthStac:NavigatorScreenParams<AuthStackParamList>
}

//
//
//

declare global {
     namespace ReactNavigation{
          interface RootParamList extends RootStackParamList{}
     }
}

export type AuthScreenNavigationType<RootName extends keyof AuthStackParamList> = CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList, RootName>,
    NativeStackNavigationProp<AppStackParamList, "Root">
>;
