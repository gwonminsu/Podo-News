package com.demoserver.demoserver.global.interfaces;

import java.time.LocalDateTime;

public interface Iauditable {
  void setCreated(LocalDateTime created);

  void setUpdated(LocalDateTime updated);
}
