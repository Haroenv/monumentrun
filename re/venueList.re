open ReactNative;

type venue = {
  id: string,
  name: string
};

let component = ReasonReact.statelessComponent "VenueList";

let make venueList::(venues: array venue) _children => {
  ...component,
  render: fun _self =>
    <View>
      <Text value="Venues visited" />
      (
        Array.map (fun {name} => <View key=name> <Text value=name /> </View>) venues |> ReasonReact.arrayToElement
      )
    </View>
};
/*
 let default =
    ReasonReact.wrapReasonForJs ::component (fun jsProps => make venues::jsProps##venues [||]); */
