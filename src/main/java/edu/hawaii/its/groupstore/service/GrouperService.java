package edu.hawaii.its.groupstore.service;

import org.springframework.stereotype.Service;

import edu.internet2.middleware.grouperClient.api.GcFindGroups;
import edu.internet2.middleware.grouperClient.ws.beans.WsFindGroupsResults;
import edu.internet2.middleware.grouperClient.ws.beans.WsGroup;
import edu.internet2.middleware.grouperClient.ws.beans.WsQueryFilter;
import edu.internet2.middleware.grouperClient.ws.beans.WsResultMeta;

import edu.internet2.middleware.grouperClient.api.GcFindStems;
import edu.internet2.middleware.grouperClient.ws.beans.WsStem;
import edu.internet2.middleware.grouperClient.ws.beans.WsStemQueryFilter;
import edu.internet2.middleware.grouperClient.ws.beans.WsFindStemsResults;

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
    queryFilter.setStemName("hawaii.edu:store");

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

  /**
   * Finds stems/folders located in the path given.
   * @param query the path to look at
   * @return an array of stems/folders located in the path passed
   */
  public WsStem[] findStems(String query) {
    GcFindStems findStemsRequest = new GcFindStems();

    WsStemQueryFilter queryFilter = new WsStemQueryFilter();
    queryFilter.setParentStemName(query);
    queryFilter.setStemQueryFilterType("FIND_BY_PARENT_STEM_NAME");

    findStemsRequest.assignStemQueryFilter(queryFilter);

    WsFindStemsResults results = findStemsRequest.execute();

    WsResultMeta resultMetadata = results.getResultMetadata();
    if (!"T".equals(resultMetadata.getSuccess())) {
      throw new RuntimeException("Error finding groups: " + resultMetadata.getSuccess() +
          ", " + resultMetadata.getResultCode() +
          ", " + resultMetadata.getResultMessage());
    }
    return results.getStemResults();
  }

}
