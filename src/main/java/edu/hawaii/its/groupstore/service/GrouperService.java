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

  public enum GroupFilterType {
    FIND_BY_NAME,
    FIND_BY_PATH
  }

  public enum StemFilterType {
    FIND_CHILDREN_OF_STEM,
    FIND_STEM_BY_EXACT_NAME
  }


  /**
   * Find groups that match the given query.
   * @param query the group name to search for
   * @param filterType the method in which groups will be filtered. FIND_BY_NAME will filter for groups whose name
   *                   contains the query passed. FIND_BY_PATH will filter for groups found directly in the query/path
   *                   passed
   * @return an array of groups
   */
  public WsGroup[] findGroups(String query, GroupFilterType filterType) {
    GcFindGroups findGroupsRequest = new GcFindGroups();

    WsQueryFilter queryFilter = new WsQueryFilter();
    if (filterType == GroupFilterType.FIND_BY_NAME) {
      // Limit results to groups whose name contains the query passed. Since the "name" field of groups in Grouper
      // contain the path, limit by approximate group name
      queryFilter.setGroupName(query);
      queryFilter.setQueryFilterType("FIND_BY_GROUP_NAME_APPROXIMATE");
      // Limit results to groups found anywhere in the hawaii.edu:store subtree
      queryFilter.setStemName("hawaii.edu:store");
    } else if (filterType == GroupFilterType.FIND_BY_PATH) {
      // Limit results to groups found directly in the path specified
      queryFilter.setStemName(query);
      queryFilter.setQueryFilterType("FIND_BY_STEM_NAME");
    }

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
   * @param filterType the method in which stems will be filtered. FIND_CHILDREN_OF_STEM will find folders/stems located
   *                   in the query passed. FIND_STEM_BY_EXACT_NAME will find the stem/folder matching the query exactly
   * @return an array of stems/folders located in the path passed
   */
  public WsStem[] findStems(String query, StemFilterType filterType) {
    GcFindStems findStemsRequest = new GcFindStems();

    WsStemQueryFilter queryFilter = new WsStemQueryFilter();
    if (filterType == StemFilterType.FIND_CHILDREN_OF_STEM) {
      queryFilter.setParentStemName(query);
      queryFilter.setStemQueryFilterType("FIND_BY_PARENT_STEM_NAME");
    } else if (filterType == StemFilterType.FIND_STEM_BY_EXACT_NAME) {
      queryFilter.setStemName(query);
      queryFilter.setStemQueryFilterType("FIND_BY_STEM_NAME");
    }

    findStemsRequest.assignStemQueryFilter(queryFilter);

    WsFindStemsResults results = findStemsRequest.execute();

    WsResultMeta resultMetadata = results.getResultMetadata();
    if (!"T".equals(resultMetadata.getSuccess())) {
      throw new RuntimeException("Error finding stems: " + resultMetadata.getSuccess() +
          ", " + resultMetadata.getResultCode() +
          ", " + resultMetadata.getResultMessage());
    }
    return results.getStemResults();
  }

}
