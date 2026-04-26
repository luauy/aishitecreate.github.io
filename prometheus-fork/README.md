# Prometheus Fork - Modified Edition

This is a modified fork of Prometheus with custom enhancements.

## Installation

To clone and set up this Prometheus fork:

```bash
git clone https://github.com/luauy/prometheus-fork.git
cd prometheus-fork
git submodule update --init --recursive
```

## Building

```bash
make build
```

## Running

```bash
./prometheus --config.file=prometheus.yml
```

## Modifications

- Custom metrics collection
- Enhanced alerting rules
- Performance optimizations

For more information, see the main README.md