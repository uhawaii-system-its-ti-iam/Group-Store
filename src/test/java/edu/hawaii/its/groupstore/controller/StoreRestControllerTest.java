package edu.hawaii.its.groupstore.controller;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.isEmptyString;
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

@ActiveProfiles("localhost")
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

  @Test
  @WithMockUhUser
  public void getStemsInPath() throws Exception {
    mockMvc.perform(get("/api/stems/children/{query}/", "hawaii.edu:store"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(6)))
        .andExpect(jsonPath("$[0].idIndex").value("124898"))
        .andExpect(jsonPath("$[0].extension").value("any-dataOrigin"))
        .andExpect(jsonPath("$[0].displayExtension").value("any-dataOrigin"))
        .andExpect(jsonPath("$[0].description").value(isEmptyString()))
        .andExpect(jsonPath("$[0].displayName").value("hawaii.edu:store:any-dataOrigin"))
        .andExpect(jsonPath("$[0].name").value("hawaii.edu:store:any-dataOrigin"))
        .andExpect(jsonPath("$[0].uuid").value("4790fdc425544cb1a5a3f455e76c7527"))

        .andExpect(jsonPath("$[1].idIndex").value("124920"))
        .andExpect(jsonPath("$[1].extension").value("hris"))
        .andExpect(jsonPath("$[1].displayExtension").value("hris"))
        .andExpect(jsonPath("$[1].description").value(isEmptyString()))
        .andExpect(jsonPath("$[1].displayName").value("hawaii.edu:store:hris"))
        .andExpect(jsonPath("$[1].name").value("hawaii.edu:store:hris"))
        .andExpect(jsonPath("$[1].uuid").value("f8b7f79fe6bd4e3fac949abe6faff3b4"))

        .andExpect(jsonPath("$[2].idIndex").value("124937"))
        .andExpect(jsonPath("$[2].extension").value("rcuh"))
        .andExpect(jsonPath("$[2].displayExtension").value("rcuh"))
        .andExpect(jsonPath("$[2].description").value(isEmptyString()))
        .andExpect(jsonPath("$[2].displayName").value("hawaii.edu:store:rcuh"))
        .andExpect(jsonPath("$[2].name").value("hawaii.edu:store:rcuh"))
        .andExpect(jsonPath("$[2].uuid").value("56ac67bb86c147e899b5f7b950261a46"))

        .andExpect(jsonPath("$[3].idIndex").value("124941"))
        .andExpect(jsonPath("$[3].extension").value("sece"))
        .andExpect(jsonPath("$[3].displayExtension").value("sece"))
        .andExpect(jsonPath("$[3].description").value(isEmptyString()))
        .andExpect(jsonPath("$[3].displayName").value("hawaii.edu:store:sece"))
        .andExpect(jsonPath("$[3].name").value("hawaii.edu:store:sece"))
        .andExpect(jsonPath("$[3].uuid").value("5a346b4f120341fcbf08e566b9beae3f"))

        .andExpect(jsonPath("$[4].idIndex").value("10043"))
        .andExpect(jsonPath("$[4].extension").value("sis"))
        .andExpect(jsonPath("$[4].displayExtension").value("sis"))
        .andExpect(jsonPath("$[4].description").value(isEmptyString()))
        .andExpect(jsonPath("$[4].displayName").value("hawaii.edu:store:sis"))
        .andExpect(jsonPath("$[4].name").value("hawaii.edu:store:sis"))
        .andExpect(jsonPath("$[4].uuid").value("ebf6e45e29214bc3a89ea3c45528f60f"))

        .andExpect(jsonPath("$[5].idIndex").value("124968"))
        .andExpect(jsonPath("$[5].extension").value("uhims"))
        .andExpect(jsonPath("$[5].displayExtension").value("uhims"))
        .andExpect(jsonPath("$[5].description").value(isEmptyString()))
        .andExpect(jsonPath("$[5].displayName").value("hawaii.edu:store:uhims"))
        .andExpect(jsonPath("$[5].name").value("hawaii.edu:store:uhims"))
        .andExpect(jsonPath("$[5].uuid").value("f21ca93db81d49779050b81faeaf4648"));
  }

}
