import { GraphQlInfo } from './interfaces';

export default function getGraphqlFields(info: GraphQlInfo) {
  return info.fieldNodes[0].selectionSet.selections.map(
    (item) => item.name.value
  );
}
