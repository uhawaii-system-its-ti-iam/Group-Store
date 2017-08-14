package edu.hawaii.its.groupstore.controller;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.internet2.middleware.grouperClient.ws.beans.WsGroup;
import edu.internet2.middleware.grouperClient.ws.beans.WsStem;

import edu.hawaii.its.groupstore.service.GrouperService;
import edu.hawaii.its.groupstore.service.GrouperService.GroupFilterType;

@RestController
public class StoreRestController {

  private static final Log logger = LogFactory.getLog(StoreRestController.class);

  @Autowired
  private GrouperService grouperService;

  @GetMapping(value = "/api/groups/name/{query}/", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<WsGroup>> groups(@PathVariable String query) {
    logger.info("Entered API to find groups by name...");
    WsGroup[] groupResults = grouperService.findGroups(query, GroupFilterType.FIND_BY_NAME);
    List<WsGroup> data = new ArrayList<WsGroup>(Arrays.asList(groupResults));
    return ResponseEntity
        .ok()
        .body(data);
  }

  @GetMapping(value = "/api/groups/path/{query}/", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<WsGroup>> groupsinPath(@PathVariable String query) {
    logger.info("Entered API to find groups in the path specified...");
    WsGroup[] groupResults = grouperService.findGroups(query, GroupFilterType.FIND_BY_PATH);
    List<WsGroup> data = new ArrayList<WsGroup>(Arrays.asList(groupResults));
    return ResponseEntity
        .ok()
        .body(data);
  }

  @GetMapping(value = "api/stems/{query}/", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<WsStem>> stems(@PathVariable String query) {
    logger.info("Entered API to find children of a stem...");
    WsStem[] stemResults = grouperService.findStems(query);
    List<WsStem> data = new ArrayList<WsStem>(Arrays.asList(stemResults));
    return ResponseEntity
        .ok()
        .body(data);
  }

}
