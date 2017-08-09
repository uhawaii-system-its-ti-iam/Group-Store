package edu.hawaii.its.groupstore.service;

import org.springframework.stereotype.Service;

import edu.internet2.middleware.grouperClient.api.GcFindGroups;
import edu.internet2.middleware.grouperClient.ws.beans.WsFindGroupsResults;
import edu.internet2.middleware.grouperClient.ws.beans.WsGroup;
import edu.internet2.middleware.grouperClient.ws.beans.WsQueryFilter;
import edu.internet2.middleware.grouperClient.ws.beans.WsResultMeta;

@Service
public class GrouperService {

  /**
   * Finds groups that match the given query.
   * @param query the group name to search for
   * @return an array of groups that closely match the query passed
   */
  public WsGroup[] findGroups(String query) {
    GcFindGroups findGroupsRequest = new GcFindGroups();

    WsQueryFilter queryFilter = new WsQueryFilter();
    queryFilter.setGroupName(query);
    queryFilter.setQueryFilterType("FIND_BY_GROUP_NAME_APPROXIMATE");

    findGroupsRequest.assignQueryFilter(queryFilter);

    WsFindGroupsResults results = findGroupsRequest.execute();

    WsResultMeta resultMetadata = results.getResultMetadata();
    if (!"T".equals(resultMetadata.getSuccess())) {
      throw new RuntimeException("Error finding groups: " + resultMetadata.getSuccess() +
          ", " + resultMetadata.getResultCode() +
          ", " + resultMetadata.getResultMessage());
    }
    return results.getGroupResults();
  }

}
