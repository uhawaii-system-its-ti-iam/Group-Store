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

import edu.hawaii.its.groupstore.service.GrouperService;

@RestController
public class StoreRestController {

  private static final Log logger = LogFactory.getLog(RoleRestController.class);

  @Autowired
  private GrouperService grouperService;

  @GetMapping(value = "/api/groups/{query}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<WsGroup>> groups(@PathVariable String query) {
    logger.info("Entered API to find groups...");
    WsGroup[] groupResults = grouperService.findGroups(query);
    List<WsGroup> data = new ArrayList<WsGroup>(Arrays.asList(groupResults));
    return ResponseEntity
        .ok()
        .body(data);
  }

}