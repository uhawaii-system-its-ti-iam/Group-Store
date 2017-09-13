package edu.hawaii.its.groupstore.controller;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.nullValue;
import static org.junit.Assert.assertNotNull;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import edu.hawaii.its.groupstore.configuration.SpringBootWebApplication;

@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@SpringBootTest(classes = { SpringBootWebApplication.class })
public class StoreRestControllerTest {

  @Autowired
  private WebApplicationContext context;

  @Autowired
  private StoreRestController storeRestController;

  private MockMvc mockMvc;

  @Before
  public void setUp() {
    mockMvc = webAppContextSetup(context)
        .apply(springSecurity())
        .build();
  }

  @Test
  public void testConstruction() {
    assertNotNull(storeRestController);
  }

  @Test
  @WithMockUhUser
  public void getGroupsInHomePath() throws Exception {
    mockMvc.perform(get("/api/groups/path/{query}/", "hawaii.edu:store"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(1)))
        .andExpect(jsonPath("$[0].idIndex").value("10016"))
        .andExpect(jsonPath("$[0].typeOfGroup").value("group"))
        .andExpect(jsonPath("$[0].extension").value("empty"))
        .andExpect(jsonPath("$[0].displayExtension").value("empty"))
        .andExpect(jsonPath("$[0].description").value(nullValue()))
        .andExpect(jsonPath("$[0].displayName").value("hawaii.edu:store:empty"))
        .andExpect(jsonPath("$[0].name").value("hawaii.edu:store:empty"))
        .andExpect(jsonPath("$[0].uuid").value("c3713ff279ea458f9b52fcb50ccee2b8"))
        .andExpect(jsonPath("$[0].detail").value(nullValue()));
  }

}
